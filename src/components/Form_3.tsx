import { FC, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@/components/Typography";
import Textfield from "@/components/Textfield";
import Radiobutton from "@/components/Radiobutton";
import Dropdown from "@/components/Dropdown";
import { FormContext } from "@/context/formContext";
import Button from "@/components/Buttons";

type FormStepThreeProps = {};

const Form_3: FC<FormStepThreeProps> = ({}) => {
  const { formData, setFormData, errors, setErrors } = useContext(FormContext)!;
  const navigate = useNavigate();

  const handleButtonClick = () => {};

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleNext = () => {
    navigate(`/form-04`);
  };

  const handlePrevious = () => {
    navigate(`/form-03`);
  };

  console.log("FormData step three:;", formData);

  return (
    <>
      <div className=" py-28 px-28 flex flex-col justify-center">
        <form className="flex flex-col gap-12">
          <Typography variant="h3">Form</Typography>
          <div className="flex gap-8">
            <Textfield
              title="Material"
              size="medium"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
            />
            <Textfield
              title="Färg/finish"
              size="medium"
              name="colorFinish"
              value={formData.colorFinish}
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
              name="width"
              value={formData.width}
              onChange={handleInputChange}
            />
            <Textfield
              title="Längd"
              size="xSmall"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
            />
            <Textfield
              title="Höjd"
              size="xSmall"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
            />
            <Textfield
              title="Djup"
              size="xSmall"
              name="depth"
              value={formData.depth}
              onChange={handleInputChange}
            />
            <Textfield
              title="Diameter"
              size="xSmall"
              name="diameter"
              value={formData.diameter}
              onChange={handleInputChange}
            />
            <Textfield
              title="Tjocklek"
              size="xSmall"
              name="thickness"
              value={formData.thickness}
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
                name="weight"
                value={formData.weight}
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
              name="avgHeightMin"
              value={formData.avgHeightMin}
              onChange={handleInputChange}
            />
            <Textfield
              title="Sitthöjd max (cm)"
              size="small"
              name="avgHeightMax"
              value={formData.avgHeightMax}
              onChange={handleInputChange}
            />
            <Textfield
              title="Ryggstöd(cm)"
              size="small"
              name="backSupport"
              value={formData.backSupport}
              onChange={handleInputChange}
            />
          </div>

          {/* <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              {" "}
              <Dropdown
                title="Glastyp"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Glasmodell"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Glastjocklek (mm)"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                onChange={handleSelectChange}
              />
            </div>
            <div className="flex gap-5">
              {" "}
              <Dropdown
                title="Hängning"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                value={formData.}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Modulmått"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                onChange={handleSelectChange}
              /> */}
          {/* <Dropdown
                title="Ljudreduktion (dB)"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                onChange={handleSelectChange}
              />
            </div> */}
          {/* <div className="flex gap-5">
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
          </div> */}

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
          {/* <Button onClick={handleSave} size="medium" variant="white">
            Spara utkast
          </Button> */}

          <Button onClick={handleNext} size="medium" variant="blue">
            Nästa &gt;
          </Button>
        </div>
      </section>
    </>
  );
};

export default Form_3;
