"use client"

// import dynamic from "next/dynamic";
import ThreeSixty from 'react-360-view'

// Dynamically import the `react-360-view` component with SSR disabled
// const ThreeSixty = dynamic(() => import("react-360-view"), {
//   ssr: false,  // Disable server-side rendering for this component
//   loading: () => <p>Loading 360° View...</p>,  // Show a loading message while it's being loaded
// });

type Event360ViewProps = {
  basePath: string;
  fileName:string;
};

const Event360View = ({ basePath,fileName }: Event360ViewProps) => {
    console.log(basePath);
  return (
    <div className="App">
      <ThreeSixty
        amount={36}
        imagePath={basePath}
        fileName={fileName}
      />
    </div>
  );
};

export default Event360View;
