import React, { useEffect, useRef, useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../SortableItem";
import { FaPlus } from "react-icons/fa";
import { arrayMove } from "@dnd-kit/sortable";

export default function ButtonArea({
    buttons,
    setButtons,
    selectedButton,
    setSelectedButton,
    AddNewButton,
}) {
    const [draggingButtonId, setDraggingButtonId] = useState(null);
    const containerRef = useRef(null); // مرجع للمكون الأساسي

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 10 },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeButton = buttons.find((button) => button.id === active.id);
        const overButton = buttons.find((button) => button.id === over.id);

        if (activeButton?.isFixed || overButton?.isFixed) return;

        if (active.id !== over.id) {
            const oldIndex = buttons.findIndex((button) => button.id === active.id);
            const newIndex = buttons.findIndex((button) => button.id === over.id);

            const reorderedButtons = arrayMove(buttons, oldIndex, newIndex);

            setButtons(reorderedButtons);
            localStorage.setItem("buttons", JSON.stringify(reorderedButtons));
        }

        setDraggingButtonId(null);
    };

    const handleDragStart = (event) => {
        setDraggingButtonId(event.active.id);
    };

    // إضافة الـ useEffect للمراقبة عند النقر خارج المكون
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current && // التحقق من وجود المرجع
                !containerRef.current.contains(event.target) && // التحقق إذا كان النقر خارج المكون
                !event.target.closest("button") // التحقق إذا كان النقر داخل زر
            ) {
                setSelectedButton(null); // إلغاء التحديد
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // تنظيف المستمع عند إزالة المكون
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setSelectedButton]);


    return (
        <main
            ref={containerRef} // إضافة المرجع هنا
            className="relative flex-1 p-6 bg-gray-200 dark:bg-gray-600">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
            <div className="mb-12">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                >
                    <SortableContext
                        items={buttons.map((button) => button.id)}
                        strategy={rectSortingStrategy}
                    >
                        {/* الشبكة العامة */}
                        <div className="grid grid-cols-12 gap-4">
                            {buttons.map((button) => {
                                const isDragging = button.id === draggingButtonId;
                                return (
                                    <div
                                        key={button.id}
                                        className={`col-span-${button.columns || 3} ${isDragging ? 'shadow-lg' : ''}`}
                                        style={{ gridColumn: `span ${button.columns || 3} / span ${button.columns || 3}` }}
                                    >
                                        <SortableItem
                                            id={button.id}
                                            button={button}
                                            onClick={setSelectedButton}
                                            selectedButton={selectedButton}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                    </SortableContext>
                </DndContext>
            </div>
            <button
                onClick={AddNewButton}
                className="absolute bottom-3 left-3 bg-primary text-white text-lg py-3 px-3 rounded-full"
            >
                <FaPlus />
            </button>
        </main>
    );
}
