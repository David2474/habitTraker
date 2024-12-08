"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ButtonAddHabit from "./components/buttons/ButtonAddHabit";
import { useState, useEffect } from "react";
import Link from "next/link";

interface values {
  id: number;
  title: string;
  description: string;
  frecuencia: string;
}

export default function Home() {
  const [habitList, setHabitList] = useState<values[]>([]);

  // Cargar hábitos desde localStorage al montar el componente
  useEffect(() => {
    const storedArray = localStorage.getItem("habitos");
    if (storedArray) {
      const parsedArray: values[] = JSON.parse(storedArray);
      setHabitList(parsedArray);
    }
  }, []);

  // Función para eliminar un hábito
  const handleDelete = (id: number) => {
    // Filtrar el hábito que queremos eliminar
    const updatedList = habitList.filter(habit => habit.id !== id);

    // Actualizar habitList en el estado
    setHabitList(updatedList);

    // Guardar el nuevo array en localStorage
    localStorage.setItem("habitos", JSON.stringify(updatedList));

    console.log(`Hábito con ID ${id} eliminado.`);
  };

  console.log("array llamado de localstorage", habitList);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-8 pb-20 gap-16 sm:p-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl">Tus hábitos</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {habitList.length ? (
            habitList.map((habit) => (
              <div
                key={habit.id}
                className="my-5 flex justify-between items-center p-3 rounded-lg shadow-md bg-gray-50 hover:bg-gray-200 hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/details/${habit.id}`}
                  className="cursor-pointer"
                >
                  {habit.title}
                </Link>

                {/* Botón de eliminación */}
                <button
                  onClick={() => handleDelete(habit.id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No hay hábitos para mostrar</p>
          )}
        </CardContent>

        <CardFooter>
          <ButtonAddHabit />
        </CardFooter>
      </Card>
    </div>
  );
}
