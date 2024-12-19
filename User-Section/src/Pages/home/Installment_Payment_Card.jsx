import { logo } from "../Assets/image";

const Installment_Card = () => {
  return (
    <div>
      <div className="border-2 border-blue-500 rounded-md p-4 max-w-md mx-auto mt-12">
        <h1 className="text-blue-600 font-bold text-center mb-4">
          ឯកសារសម្រាប់បង់រំលស់
        </h1>
        <ul className="list-decimal pl-8 text-gray-700">
          <li>សៀវភៅគ្រួសារ</li>
          <li>អត្តសញ្ញាណប័ណ្ណ</li>
          <li>លិខិតបញ្ជាក់ប្រាក់ចំនូល</li>
        </ul>
        <p className="mt-4 text-gray-700">
          សូមអញ្ជើញយកមកនូវឯកសារខាងលើមកហាង យើងខ្ញុំ
          ដើម្បីធ្វើការស្នើសុំបង់រំលស់ជាមួយ ធនាគារ។ អរគុណ!!
        </p>
      </div>

      {/* jes tea dak sin te */}
      <div className="flex-col">
        <img src={logo} alt="logo" className="mt-2 rounded-md" />
        <img src={logo} alt="logo" className="mt-2 rounded-md" />
      </div>
    </div>
  );
};

export default Installment_Card;
