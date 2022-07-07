export default function SectionContainer({ children }) {
  return (
    <div className="mx-auto mt-5 max-w-3xl px-4 transition-all ease-in-out sm:px-6 xl:max-w-7xl xl:px-0">
      <div className="flex h-full flex-col justify-between transition-all">{children}</div>
    </div>
  )
}
