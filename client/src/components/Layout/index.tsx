import {
  Route,
  Routes
} from "react-router-dom";
import Header from "../Header";
import RegistryList from "../../pages/RegistryList";
import AddApiary from "../../pages/AddApiary";
import {
  Centered,
  Container
} from "./styles";

const AppLayout = () => {
  return (
    <Container>
      <Header/>
      <Centered>
        <Routes>
          <Route path="/" element={
            <RegistryList/>
          }
          />

          <Route path="/registry-list" element={
            <RegistryList/>
          }
          />

          <Route path="/add-apiary" element={
            <AddApiary/>
          }
          />
        </Routes>
      </Centered>
    </Container>
  )
};

export default AppLayout;
