import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="https://saveiros.com.br/home/wp-content/uploads/2023/02/cropped-LOGO_SAVEIROS.png"
        alt="Saveiros Logo"
        width={100}
        height={35}
        className="h-8 w-auto"
        priority
      />
    </div>
  )
} 