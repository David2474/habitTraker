'use client'
import { 
    Card, 
    CardContent, 
    CardTitle, 
    CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; 


export default function AddHabit(){

    const router = useRouter();
    const handleToBack = () => {
        router.push('/')
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <p>Hola desde</p>
            <Button onClick={handleToBack}>
                Regresar
            </Button>
        </div>
      );
}