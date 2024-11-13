import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ButtonAddHabit from "./components/buttons/ButtonAddHabit";


let habist = [
  {
    title: "Estudiar"
  },
  {
    title: "Leer un libro"
  },
  {
    title: "Hacer ejercicio"
  }
]

export default function Home() {

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-8 pb-20 gap-16 sm:p-20">
       <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl">Tus habitos</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {
            habist.map( habit => (
                <li key={habit.title} className="my-5 list-none cursor-pointer hover:bg-gray-200 bg-gray-50 p-3 rounded-lg shadow-md hover:shadow-md transition-shadow">
                  {habit.title}
                </li>
            ))
          }
        </CardContent>

        <CardFooter>
        <ButtonAddHabit>

        </ButtonAddHabit>
        </CardFooter>
       </Card>
    </div>
  );
}
