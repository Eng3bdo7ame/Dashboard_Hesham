import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BsPinAngleFill } from "react-icons/bs";
import { FcOk } from "react-icons/fc";

export default function SortableItem({ id, button, onClick, selectedButton }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        disabled: button.isFixed, // منع السحب إذا كان الزر مثبتًا
    });

    const style = {
        transform: button.isFixed ? undefined : CSS.Transform.toString(transform),
        transition: button.isFixed ? undefined : transition,
        width: '100%', // العرض الكامل
        height: '50px', // الارتفاع الكامل
    };


    return (
        <button
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...(button.isFixed ? {} : listeners)} // منع الاستماع للأحداث إذا كان الزر مثبتًا
            onClick={onClick}
            className={`flex items-center justify-center gap-2 text-white py-2 px-4 rounded shadow ${button.isFixed ? "bg-gray-400 text-white hover:bg-gray-400 cursor-not-allowed" : "bg-blue-500"} ${selectedButton?.id === button.id ? "bg-green-300 hover:bg-green-300 text-black font-bold" : ""} " hover:bg-blue-600 focus:outline-none"`}
        >
            {button.isFixed && <BsPinAngleFill /> || selectedButton?.id === button.id && <FcOk />}{button.name || `Button ${button.id}`}
        </button>
    );
}
