import { RxCheckCircled } from "react-icons/rx";

const ListItemModal = ({
  trigger,
  setTrigger,
  items,
  triggerFunction,
  cname,
  defaultSelection,
  email,
}) => {
  return (
    <div
      className={`absolute top-0 shadow-lg translate-all duration-200 ${cname} ${
        trigger ? "scale-100" : "scale-0"
      }
      ${cname}
      
    `}>
      <div className="flex flex-col gap-4 text-center bg-white rounded-b-lg shadow-lg p-2 overflow-y-auto max-h-48 custom_scrollbar">
        <div className="text-left flex flex-col text-sm text-[#034F75] tracking-widest pb-2">
          {items?.map((item, index) => (
            <span
              onClick={() => {
                setTrigger(false);
                triggerFunction(item, email);
              }}
              key={index}
              className={` flex items-center hover:bg-[#034F75] hover:text-white shadow-sm p-2 rounded-md cursor-pointer justify-between ${
                item?.name?.toLowerCase() === "absent" && "text-red-500"
              } ${
                item?.name?.toLowerCase() === "present" && "text-green-500"
              } `}>
              <p
                key={index}
                className="">
                {item?.name?.toUpperCase()}
              </p>
              <RxCheckCircled
                className={`inline-block text-lg ${
                  defaultSelection !== item?.name?.toLowerCase() &&
                  defaultSelection !== item?.id &&
                  "hidden"
                }`}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListItemModal;
