import { offer_header } from "../../Constants";

const Offer_header = () => {
  return (
    <div className="p-6">
      <section className="max-w-4xl mx-auto">
        <h1 className="green-title mb-20 green-text font-semibold text-center">
          Offer Discount
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offer_header.map((element, index) => (
            <FormField key={index} label={element.label} />
          ))}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end">
            <input
              type="submit"
              className="green-btn px-6 py-2 text-white font-semibold rounded-md"
              value="Submit"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

const FormField = ({ label }) => (
  <div className="flex flex-col items-start">
    <label htmlFor={label} className="green-txt text-left mb-2">
      {label}
    </label>
    <input
      type="text"
      id={label}
      className="input-style h-10 w-full px-3 border rounded-md"
      aria-label={label}
    />
  </div>
);

export default Offer_header;
