"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface values {
  id: number;
  title: string;
  description: string;
  frecuencia: string;
}

export default function AddHabit() {
  const router = useRouter();
  const [title, setTitulo] = useState("");
  const [description, setDescription] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [arrayValues, setArrayValues] = useState<values[]>([]);

  let idHabitList: number = 0;

  const storedId = localStorage.getItem("idHabitList");
  if (storedId) {
    idHabitList = parseInt(storedId, 10); // Asegúrate de que es un número.
  }

  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem("habitos") || "[]");
    setArrayValues(savedValues);
  }, []);

  const handleSetValues = () => {
    const objectValues: values = {
      id: ++idHabitList,
      title: title,
      description: description,
      frecuencia: frecuencia,
    };

    console.log("Objeto agregado:", objectValues);

    setArrayValues((prevArray) => {
      const updatedArray = [...prevArray, objectValues];

      localStorage.setItem("habitos", JSON.stringify(updatedArray));
      localStorage.setItem("idHabitList", JSON.stringify(idHabitList));
      console.log("Array actualizado:", updatedArray); 
      return updatedArray;
    });

    router.push("/");
  };

  const handleToBack = () => {
    router.push("/");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl">Nuevo Hábito</h1>
          </CardTitle>
          <CardDescription>
            Ingresa los detalles del nuevo hábito
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="my-3">
            <label>Titulo</label>
            <Input
              type="text"
              className=""
              placeholder="Agrega un titulo"
              id="title"
              value={title}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Descripción</label>
            <Input
              type="text"
              placeholder="Agrega una descripción"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="my-3">
            <label>Frecuencia</label>
            <Input
            type="text"
            placeholder="Agrega la frecuencia"
            id="frecuencia"
            value={frecuencia}
            onChange={(e) => setFrecuencia(e.target.value)}
          />
          </div>
        </CardContent>

        <CardFooter className="flex justify-around">
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleToBack}
          >
            Regresar
          </Button>
          <Button onClick={handleSetValues}>Crear</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
