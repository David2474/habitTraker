"use client";
import { Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface Item {
  id: number;
  title: string;
  description: string;
  frecuencia: string;
}

const Details = ({ params }: { params: { id: string } }) => {
  const Router = useRouter();
  const [item, setItem] = useState<Item | null>(null);

  const { id } = params;

  useEffect(() => {
    if (id) {
      const storedItems = JSON.parse(localStorage.getItem("habitos") || "[]");
      const selectedItem = storedItems.find(
        (item: Item) => item.id === parseInt(id)
      );
      setItem(selectedItem || null);
      console.log(selectedItem);
    }
  }, [id]);

  if (!item) {
    return console.log("...cargando");
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center w-screen h-screen">
      <Card className="w-full max-w-md p-2">
        <CardHeader>
          <CardTitle>
            <p className="text-2xl">Detalles del habito</p>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p><strong>Titulo:</strong> {item.title}</p>
          <p><strong>Descripción:</strong> {item.description}</p>
          <p><strong>Frecuencia:</strong> {item.frecuencia}</p>
        </CardContent>

        <CardFooter className="flex justify-around">
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => Router.push("/")}
          >
            Regresar
          </Button>

            <Link
              href={`/update/${item.id}`}
            >
          <Button>
              Editar
          </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Details;
