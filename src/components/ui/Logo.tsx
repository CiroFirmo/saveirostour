import Image from 'next/image'
import logo from '../../../public/images/logo.png'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logo}
        alt="Saveiros Logo"
        width={100}
        height={35}
        className="h-8 w-auto"
        priority
      />
    </div>
  )
} 