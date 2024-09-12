"use client"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

type DatasetPageContextType = {
    dataset: Dataset | null;
    selectedInstruction: Instruction | null;
    setDataset: Dispatch<SetStateAction<Dataset | null>>;
    setSelectedInstruction: Dispatch<SetStateAction<Instruction | null>>
    addInstructionMode: boolean;
    setAddInstructionMode: Dispatch<SetStateAction<boolean>>;
    editInstructionMode: boolean;
    setEditInstructionMode: Dispatch<SetStateAction<boolean>>;
}

export const datasetPageContext = createContext<DatasetPageContextType>({
    dataset: null,
    selectedInstruction: null,
    setDataset() { },
    setSelectedInstruction() { },
    editInstructionMode: false,
    setEditInstructionMode() { },
    addInstructionMode: false,
    setAddInstructionMode() { },
});

export default function DatasetPageContext({ children }: PropsWithChildren) {

    const [dataset, setDataset] = useState<Dataset | null>(null)
    const [selectedInstruction, setSelectedInstruction] = useState<Instruction | null>(null)
    const [addInstructionMode, setAddInstructionMode] = useState(false);
    const [editInstructionMode, setEditInstructionMode] = useState(false);

    return (
        <datasetPageContext.Provider
            value={{
                dataset,
                selectedInstruction,
                setDataset,
                setSelectedInstruction,
                addInstructionMode,
                setAddInstructionMode,
                setEditInstructionMode,
                editInstructionMode
            }}
        >
            {children}
        </datasetPageContext.Provider>
    )
};
