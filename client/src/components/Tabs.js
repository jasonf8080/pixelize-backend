import React from "react";
import { IoImagesOutline } from "react-icons/io5";
import { VscHeartFilled } from "react-icons/vsc";

const Tabs = ({ tab, setTab }) => {
  return (
<section className="max-w-7xl mx-auto px-5 md:px-10">
  <div className="flex border-b border-gray-200 dark:border-gray-700">
    <Button
      icon={<IoImagesOutline />}
      name="posts"
      tab={tab}
      setTab={setTab}
    />

    <Button
      icon={<VscHeartFilled />}
      name="likes"
      tab={tab}
      setTab={setTab}
    />
  </div>
</section>

  );
};

const Button = ({ icon, name, tab, setTab }) => {
  return (
    <button
      onClick={() => setTab(name)}
      className={`
        ${tab === name ? "text-secondary-color dark:text-main-color border-b-[1px] border-b-secondary-color dark:border-b-main-color border-secondary-color dark:border-main-color" : "text-black dark:text-white"}
        w-full flex items-center justify-center gap-2 py-3 font-medium
        hover:bg-gray-50 dark:hover:bg-[#222] transition text-lg 
      `}
      type="button"
    >
      {icon}
      <span className="uppercase">{name}</span>
    </button>
  );
};

export default Tabs;
