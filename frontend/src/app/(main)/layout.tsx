import React from "react";
import Header from "../../lib/components/layout/header";
import Footer from "../../lib/components/layout/footer";

interface MainLayoutProps {
    children: React.ReactNode;
    showHeaderFooter?: boolean; // Optional prop to control header/footer visibility
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    showHeaderFooter = false,
}) => {
    return (
        <div className="bg-[#090e14]">
            {showHeaderFooter && <Header />}
            {children}
            {showHeaderFooter && <Footer />}
        </div>
    );
};

export default MainLayout;
