// /components/ButtonAddHabit.tsx
'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Importa `useRouter` desde `next/navigation`

export default function ButtonAddHabit() {
  const router = useRouter();

  const handleAddHabit = () => {
    // Redirige al formulario
    router.push('habit');
  };

  return (
    <Button onClick={handleAddHabit} className="w-full">
      Agregar Nuevo Hábito
    </Button>
  );
}
