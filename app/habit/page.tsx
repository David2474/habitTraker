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

  // Cargar los hábitos guardados al montar el componente
  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem("habitos") || "[]");
    setArrayValues(savedValues);
  }, []);

  const handleSetValues = () => {
    const objectValues: values = {
      title: title,
      description: description,
      frecuencia: frecuencia,
    };

    console.log("Objeto agregado:", objectValues);

    // Usamos el valor anterior del array para agregar el nuevo objeto
    setArrayValues((prevArray) => {
      const updatedArray = [...prevArray, objectValues];

      // Guardamos el array actualizado en localStorage
      localStorage.setItem("habitos", JSON.stringify(updatedArray));

      console.log("Array actualizado:", updatedArray); // Verificamos el array actualizado
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
          <Input
            type="text"
            className="my-2"
            id="title"
            value={title}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <Input
            type="text"
            className="my-2"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="text"
            className="my-2"
            id="frecuencia"
            value={frecuencia}
            onChange={(e) => setFrecuencia(e.target.value)}
          />
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
