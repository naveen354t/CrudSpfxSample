import * as React from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { ISpfxCrudPnpProps } from "./ISpfxCrudPnpProps";
import Home from "./home/Home";

// export default class SpfxCrudPnp extends React.Component<
//   ISpfxCrudPnpProps,
//   {}
// > {
//   public render(): React.ReactElement<ISpfxCrudPnpProps> {
//     return (
//       <>
//         <HashRouter>
//           <Home />
//         </HashRouter>
//       </>
//     );
//   }
// }

const SpfxCrudPnp: React.FC<ISpfxCrudPnpProps> = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path={"/"} element={<Navigate to={"/addresses/home"} />} />
          <Route path={"/addresses/home"} element={<Home />} />
          <Route path={"/addresses/add"} element={<Home />} />
          <Route path={"/addresses/view/:addressId"} element={<Home />} />
          <Route path={"/addresses/edit/:addressId"} element={<Home />} />
          <Route path={"*"} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default SpfxCrudPnp;
