import Interactivebutton from "./compoents/Interactivebutton";
import SsrRendering from "./compoents/SsrRendering";

const SsrPage = () => {
    console.log('📦 Server-side render: /dashboard');

  return (
    <div>
        <br />
        <br />
      <h1>This is the server generated page.</h1>
      <SsrRendering/>
      <Interactivebutton />
    </div>
  );
};

export default SsrPage;
