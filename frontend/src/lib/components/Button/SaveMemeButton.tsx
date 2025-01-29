import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const SaveMemeButton = () => {
    const { data: session } = useSession();
    const handleSaveMeme = async () => {
        try {
            console.log("save meme clicked ---------");
            const response = await fetch(
                "https://mongoose-infinite-truly.ngrok-free.app/api/save_memes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_email: session?.user?.email }),
                }
            );
            console.log("response - > ", response);
        } catch (error) {
            console.error("error : ", error);
        }
    };
    return (
        <Button className=" bg-blue-500 rounded-md" onPress={handleSaveMeme}>
            Save
        </Button>
    );
};
export default SaveMemeButton;
