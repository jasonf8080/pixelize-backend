const ProfileLoader = () => {
  return (
    <section className="flex flex-col items-center py-12 max-w-7xl mx-auto animate-pulse">
      
      {/* Avatar */}
      <div className="max-w-[200px] min-w-[200px] h-[200px] rounded-full bg-slate-200 mb-8" />

      {/* Text content */}
      <div className="max-w-full px-5 text-center w-full">

        {/* Username */}
        <div className="mx-auto mb-4 h-7 w-40 rounded bg-slate-200" />

        {/* Location */}
        <div className="mx-auto mb-4 h-4 w-48 rounded bg-slate-200" />

        {/* Bio */}
        <div className="mx-auto mb-2 h-4 w-[90%] max-w-[800px] rounded bg-slate-200" />
        <div className="mx-auto mb-2 h-4 w-[85%] max-w-[760px] rounded bg-slate-200" />
        <div className="mx-auto mb-6 h-4 w-[70%] max-w-[700px] rounded bg-slate-200" />

        {/* Photos count */}
        <div className="mx-auto my-5 h-5 w-24 rounded bg-slate-200" />

        {/* Edit button */}
        <div className="mx-auto mb-6 h-4 w-28 rounded bg-slate-200" />

        {/* Divider */}
        <div className="w-[200px] mx-auto border-b-[2px] border-slate-200" />
      </div>

    </section>
  );
};

export default ProfileLoader;
