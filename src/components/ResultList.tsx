import { FaDivide, FaEquals } from "react-icons/fa";
import { ImPlus, ImMinus, ImCross } from "react-icons/im";

interface ResultListProps {
  firstNumber: number;
  secondNumber: number;
  symbol: number;
  resultant: number;
}

const ResultList = ({
  firstNumber,
  secondNumber,
  symbol,
  resultant
}: ResultListProps) => {

  interface ISymbolMap {
    [key: number]: JSX.Element;
  }

  const symbolMap: ISymbolMap = {
    0: <ImPlus />,
    1: <ImMinus />,
    2: <ImCross />,
    3: <FaDivide />
  }

  return (
    <div className="flex gap-2 items-center p-2">
      <div className="flex justify-center items-center p-2 w-11 h-11 bg-blue-700 text-white rounded">
        <p className="text-center">{firstNumber}</p>
      </div>
      <div>
        {symbolMap[symbol]}
      </div>
      <div className="flex justify-center items-center p-2 w-11 h-11 bg-blue-700 text-white rounded">
        <p className="text-center">{secondNumber}</p>
      </div>
      <div>
        <FaEquals />
      </div>
      <div className="flex justify-center items-center p-2 w-11 h-11 bg-blue-700 text-white rounded">
        <p className="text-center">{resultant}</p>
      </div>
    </div>
  )
}

export default ResultList;
