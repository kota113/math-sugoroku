export default function SwitchPlayerModal({isVisible, playerName}: { isVisible: boolean, playerName: string }) {
  return (<>
    {isVisible && (
      <div
        className={"absolute flex justify-center items-center h-full w-full z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 opacity-80"}>
        <h1 className={"text-white text-center text-3xl font-bold"}>Player {playerName} の番です。</h1>
      </div>
    )}
  </>);
}
