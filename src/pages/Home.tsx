import Button from "@/components/Buttons";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

import ProjectCards from '@/components/ProjectCards';

const Home: FC = () => {
  
  const navigate = useNavigate();
  


  return (
    <>
    <div className="flex flex-col justify-center items-center bg-slate-100 h-full pb-8">
     
      <div className="flex w-full justify-center items-center px-10 pt-2">

        <div className="flex flex-col px-10 w-[50%]">        
          <h2 className="text-[40px] font-poppins text-start font-bold mt-16 text-[#2d4352]">
            Centrum för cirkulärt byggande - CCBuild
          </h2>
          <p className="text-[#2d4352] text-[20px] font-poppins text-start pt-3">Samhällsbyggnadsbranschens gemensamma arena för cirkulärt byggande och förvaltning</p>
        </div>

        <div className="flex flex-col w-[15%] "></div>

        <div className="flex flex-col gap-3 items-center justify-start w-[30%]">
          <Button
            size="medium"
            variant="blue"
            className="px-6 py-4"
            onClick={() => navigate("/form-01")}
          >
            Starta den fantastiska resan med att lägga till en produkt
          </Button>
          <img src="/badge.png" alt="CCBuild" className="w-[30%] h-[30%]"/>
        </div>
      </div>
    </div>

    <div className="flex w-full justify-center items-center px-10 pt-2 mb-10"> 
        <div className="flex flex-col w-[60%]">
          <ProjectCards />
        </div>
    </div>
    <div className="flex w-full justify-center items-center px-10 pt-2 mb-10"> 
        <div className="grid grid-cols-2 gap-6 w-[60%] py-5">
          <img src="/avfallstrappa.png" alt="Avfallstrappa" className="w-[100%] h-[100%]"/>
          <div className="flex flex-col gap-2 items-center justify-start">
            <h1 className="text-[36px] font-poppins text-start font-bold mt-16 text-black">
              Centrum för cirkulärt byggande
            </h1>
            <p className="text-[14px] font-inter">
              CCBuild är samhällsbyggnadsbranschens arena för cirkulärt byggande. Vi växer stadigt och 
              har idag över 170 anslutna aktörer. Vi samarbetsparter i CCBuild vill stärka marknaden för 
              cirkulära tjänster och produkter samt etablera arbetssätt i linje med cirkulära principer: 
              Vi prioriterar resursminimering och bevarande av byggnader och material. Vi underhåller, renoverar och 
              använder befintliga resurser. Vi vill designa byggnader för ett långt liv och så att materialet kan 
              demonteras och återbrukas.
              Vi prioriterar fortsatt användning av produkter genom återbruk, både internt och genom handel. Vi 
              använder CCBuilds produktbank och marknadsplats för att hitta och återanvända produkter.
              Vi vill öka återvinningen av material som inte går att återbruka och vill att andelen cirkulerat 
              material ökar i nyproducerade varor.
            </p>
            </div>
        </div>
    </div>
    
    </>
  );
};

export default Home;
