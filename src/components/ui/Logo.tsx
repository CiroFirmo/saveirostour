import Image from 'next/image'
import logo from '../../../public/images/logo.png'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logo}
        alt="Saveiros Logo"
        width={200}
        height={70}
        className="h-16 w-auto"
        priority
      />
    </div>
  )
} 