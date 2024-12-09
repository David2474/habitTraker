"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



interface Habito {
  id: number;
  title?: string;
  description?: string;
  frecuencia?: string;
}

interface ChangeValue {
  id: number;
  title?: string;
  description?: string;
  frecuencia?: string;
}

export default function Update({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<Habito | null>(null);
  const [arrayValues, setArrayValues] = useState<Habito[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const router = useRouter();

  const { id } = params;

  useEffect(() => {
    if (id) {
      const storedItems = JSON.parse(localStorage.getItem("habitos") || "[]");
      const selectedItem = storedItems.find(
        (habito: Habito) => habito.id === parseInt(id)
      );
      if (selectedItem) {
        setItem(selectedItem); // Establecer el objeto seleccionado
        setTitle(selectedItem.title || "");
        setDescription(selectedItem.description || "");
        setFrecuencia(selectedItem.frecuencia || "");
      }
      setArrayValues(storedItems); // Establecer el array completo
    }
  }, [id]);

  const handleChangeValue = () => {
    if (!item) {
      return;
    }

    // Actualizar el objeto con los nuevos valores
    const updatedItem: Habito = {
      ...item,
      title: title || item.title,
      description: description || item.description,
      frecuencia: frecuencia || item.frecuencia,
    };

    // Actualizar el array de objetos
    const updatedArray = arrayValues.map((habito) =>
      habito.id === item.id ? updatedItem : habito
    );

    // Guardar el array actualizado en localStorage
    localStorage.setItem("habitos", JSON.stringify(updatedArray));

    // Actualizar el estado con el nuevo array
    setArrayValues(updatedArray);
    setItem(updatedItem);

    router.push("/");
    // Opcional: Redirigir o dar un mensaje de éxito
    console.log("Objeto actualizado exitosamente");
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Actualizar Hábito</CardTitle>
        </CardHeader>

        <CardContent>
          <div>
            <label>Título</label>
            <Input
              value={title}
              placeholder={item?.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label>Descripción</label>
            <Input
              value={description}
              placeholder={item?.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label>Frecuencia</label>
            <Input
              value={frecuencia}
              placeholder={item?.frecuencia}
              onChange={(e) => setFrecuencia(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-around">
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-500">Regresar</Button>
          </Link>

          <Button onClick={handleChangeValue}>Guardar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
