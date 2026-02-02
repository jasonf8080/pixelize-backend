const EditProfileLoading = () => {
  return (
    <div className="mx-auto max-w-xl px-4 pt-10 pb-6 text-center animate-pulse">
      {/* Avatar skeleton */}
      <div className="mx-auto h-[200px] w-[200px] rounded-full bg-slate-200" />

      {/* Inputs skeleton */}
      <div className="mt-10 space-y-6 text-left">
        {/* Username */}
        <div>
          <div className="mb-2 h-3 w-24 rounded bg-slate-200" />
          <div className="h-[46px] w-full rounded-2xl bg-slate-200" />
        </div>

        {/* Location */}
        <div>
          <div className="mb-2 h-3 w-24 rounded bg-slate-200" />
          <div className="h-[46px] w-full rounded-2xl bg-slate-200" />
        </div>

        {/* Bio */}
        <div>
          <div className="mb-2 h-3 w-16 rounded bg-slate-200" />
          <div className="h-[96px] w-full rounded-2xl bg-slate-200" />
          <div className="mt-2 h-3 w-16 rounded bg-slate-200" />
        </div>
      </div>

      {/* Buttons skeleton */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="h-9 w-20 rounded-full bg-slate-200" />
        <div className="h-10 w-32 rounded-full bg-slate-300" />
      </div>
    </div>
  );
};

export default EditProfileLoading;
