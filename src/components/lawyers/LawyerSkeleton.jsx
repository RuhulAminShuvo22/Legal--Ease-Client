export default function LawyerSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-[#E8DDCF] rounded-3xl overflow-hidden">

      <div className="h-72 bg-[#F3EEE7]" />

      <div className="p-6">

        <div className="h-7 w-2/3 rounded bg-[#F3EEE7]" />

        <div className="h-5 w-1/2 rounded bg-[#F3EEE7] mt-4" />

        <div className="h-5 w-1/3 rounded bg-[#F3EEE7] mt-3" />

        <div className="h-5 w-2/5 rounded bg-[#F3EEE7] mt-3" />

        <div className="h-6 w-1/4 rounded bg-[#F3EEE7] mt-5" />

        <div className="grid grid-cols-2 gap-3 mt-8">

          <div className="h-12 rounded-xl bg-[#F3EEE7]" />

          <div className="h-12 rounded-xl bg-[#F3EEE7]" />

        </div>

      </div>
    </div>
  );
}