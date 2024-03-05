import React from 'react';
import getActiveTab from './utils/getActiveTab';
import NotFound from './components/NotFound';
import ResultList from './components/ResultList';
import getCountleResult from './utils/getCountleResult';

const App: React.FC = () => {
  const [isCountle, setIsCountle] = React.useState<boolean | null>(null);
  const [activeTab, setActiveTab] = React.useState<chrome.tabs.Tab | null>(null);
  const [countleResult, setCountleResult] = React.useState<number[][]>([]);

  React.useEffect(() => {
    (
      async () => {
        const tab = await getActiveTab();
        setActiveTab(tab);
        if (tab.url && tab.url.includes('countle.org')) {
          setIsCountle(true);
        } else {
          setIsCountle(false);
        }
      }
    )();
  }, []);

  interface IInjectedResult {
    target: number;
    inputArray: number[]
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    chrome.scripting.executeScript({
      target: { tabId: activeTab?.id ?? 0 },
      func: () => {
        const targetDiv = document.querySelector('.target');
        const target = targetDiv?.textContent ? parseInt(targetDiv.textContent.trim(), 10) : 0;
        const inputArrayNodes = document.querySelector('.source-cards')?.children;
        let inputArray: number[] = [];
        if (inputArrayNodes) {
          for (let i = 0; i < inputArrayNodes.length; i++) {
            const textContent = inputArrayNodes[i].textContent;
            if (textContent) {
              inputArray.push(parseInt(textContent.trim(), 10));
            }
          }
        }
        return {
          target,
          inputArray
        }
      }
    }, (results) => {
      const injectedResult = results[0];
      const { target, inputArray } = injectedResult.result as IInjectedResult
      setCountleResult(getCountleResult(target, inputArray));
    });
  }

  if (isCountle === null) {
    return <div>Loading...</div>;
  }

  if (!isCountle) {
    return <NotFound />;
  }

  return (
    <div className=' flex flex-col items-center justify-center p-4 w-[240px]'>
      {
        countleResult &&
        <ul>
          {
            countleResult.map((result, index) => (
              <li key={`result_${index}`}>
                <ResultList
                  firstNumber={result[0]}
                  secondNumber={result[2]}
                  symbol={result[1]}
                  resultant={result[3]}
                />
              </li>
            ))
          }
        </ul>
      }
      <button type="button" onClick={handleClick} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Solve
      </button>
    </div>
  );
};

export default App;
