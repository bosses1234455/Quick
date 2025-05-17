import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex h-20 justify-between items-center p-4 bg-gray-100 mb-8">
    <Image src="/Logo.png" width={65} height={65} alt="Logo" className="rounded-full"/>
    <Link href={'/login'} className="px-6 py-2 bg-gray-200 rounded-full cursor-pointer">Login</Link>
  </header>
  )
}
