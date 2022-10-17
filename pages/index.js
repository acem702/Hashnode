import Header from "components/Header";
import SideMenu from "components/Home/SideMenu";

export default function Home() {
  return (
    <>
      <div className="w-full dark:bg-black bg-primary-light-200 border-b border-primary-dark-500 mb-spacing">
        <Header />
        <div
          className={`w-full xl:container mx-auto flex gap-spacing min-h-[calc(100vh-76px)] h-full`}
        >
          <div className={`flex-[1.38] hidden lg:block`}>
            <SideMenu />
          </div>
          <div className={`flex-[5] bg-gray-200`}>{/* <Posts /> */}</div>
          <div className={`flex-[2] hidden lg:block`}></div>
        </div>
      </div>
    </>
  );
}
