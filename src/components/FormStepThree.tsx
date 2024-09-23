import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@/components/Typography";
import Textfield from "@/components/Textfield";
import Radiobutton from "@/components/Radiobutton";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Buttons";

type FormStepThreeProps = {};
const navigate = useNavigate();
const handleInputChange = () => {};
const handleButtonClick = () => {};
const handleNext = () => {
  navigate(`/form-02`);
};

const handlePrevious = () => {
  navigate(`/form-04`);
};

const FormStepThree: FC<FormStepThreeProps> = ({}) => {
  return (
    <>
      <div className=" py-28 px-28 flex flex-col justify-center">
        <form className="flex flex-col gap-12">
          <Typography variant="h3">Form</Typography>
          <div className="flex gap-8">
            <Textfield
              title="Material"
              size="medium"
              name="name"
              value="Material"
              onChange={handleInputChange}
            />
            <Textfield
              title="Färg/finish"
              size="medium"
              name="name"
              value="Färg/finish"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <Typography variant="h6">Enhet mått</Typography>
              <div className="flex align-middle gap-5">
                <Radiobutton measurement="mm" name="mm" />
                <Radiobutton measurement="cm" name="cm" />
                <Radiobutton measurement="m" name="m" />
              </div>
            </div>
            <Textfield
              title="Bredd"
              size="xSmall"
              name="name"
              value="0"
              onChange={handleInputChange}
            />
            <Textfield
              title="Längd"
              size="xSmall"
              name="name"
              value="0"
              onChange={handleInputChange}
            />
            <Textfield
              title="Höjd"
              size="xSmall"
              name="name"
              value="0"
              onChange={handleInputChange}
            />
            <Textfield
              title="Djup"
              size="xSmall"
              name="name"
              value="0"
              onChange={handleInputChange}
            />
            <Textfield
              title="Diameter"
              size="xSmall"
              name="name"
              value="0"
              onChange={handleInputChange}
            />
            <Textfield
              title="Tjocklek"
              size="xSmall"
              name="name"
              value="0"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <Typography variant="h6">Enhet vikt</Typography>
              <div className="flex align-middle gap-5">
                <Radiobutton measurement="g" name="g" />
                <Radiobutton measurement="hg" name="hg" />
                <Radiobutton measurement="kg" name="kg" />
              </div>
            </div>
            <div className="flex align-middle gap-2">
              <Textfield
                title="Vikt"
                size="xSmall"
                name="vikt"
                value="0"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Typography variant="h3">Egenskaper</Typography>
          {/* Conditionally render properties depending on product category */}
          <div className="flex gap-5">
            <Textfield
              title="Sitthöjd min (cm)"
              size="small"
              name="name"
              value="0"
              onChange={handleInputChange}
            />
            <Textfield
              title="Sitthöjd max (cm)"
              size="small"
              name="name"
              value="0"
              onChange={handleInputChange}
            />
            <Textfield
              title="Ryggstöd(cm)"
              size="small"
              name="name"
              value="0"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              {" "}
              <Dropdown
                title="Glastyp"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
              <Dropdown
                title="Glasmodell"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
              <Dropdown
                title="Glastjocklek (mm)"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
            </div>
            <div className="flex gap-5">
              {" "}
              <Dropdown
                title="Hängning"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
              <Dropdown
                title="Modulmått"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
              <Dropdown
                title="Ljudreduktion (dB)"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
            </div>
            <div className="flex gap-5">
              {" "}
              <Dropdown
                title="Brandklass"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name=""
                value=""
                onChange={}
              />
              <Dropdown
                title="Inbrottsskydd"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
              <Dropdown
                title="Omgivning/klimat"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
            </div>
            <div className="flex gap-5">
              {" "}
              <Dropdown
                title="Karmdjup (mm)"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
            </div>
          </div>
          <div>
            <p>Det finns inga specifika egenskaper för vald produkttyp.</p>
          </div>
        </form>
      </div>

      <section className="w-full flex justify-between mb-12">
        <Button onClick={handlePrevious} size="medium" variant="white">
          &lt; Föregående
        </Button>

        <div className="flex gap-2">
          <Button onClick={handleSave} size="medium" variant="white">
            Spara utkast
          </Button>

          <Button onClick={handleNext} size="medium" variant="blue">
            Nästa &gt;
          </Button>
        </div>
      </section>
    </>
  );
};

export default FormStepThree;
