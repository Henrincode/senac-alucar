import Image from "next/image";

export default function Home() {
  return (
    <div className="
      w-dvw h-dvh 

      bg-[url('https://dicas.olx.com.br/wp-content/uploads/2023/11/melhores-carros-para-pegar-estrada-2023.jpg')]
      bg-cover bg-center bg-no-repeat
    ">
      {/* filtro blur */}
      <div className="
        flex flex-col justify-center items-center
        w-full h-full p-6
        backdrop-blur
      ">
        {/* main */}
        <div className="
        box overflow-auto rounded-xl
        h-full max-h-200
        shadow-2xl shadow-black/50

        bg-amber-50
        
      ">
          <div className="overflow-auto h-full p-2">
            Olá Mundo!
          </div>
        </div>
      </div>
    </div>
  )
}
