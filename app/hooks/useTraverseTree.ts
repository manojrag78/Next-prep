import { useState } from "react";

export interface TraverseTree {
  id: string;
  name: string;
  type: "folder" | "file";
  childern?: TraverseTree[];
}
const generateId = () => Math.random().toString(36).substring(0, 9);

export const useTraverseTree = () => {
  const [structure, setStructure] = useState<TraverseTree[]>([]);

  const addNode = (
    parentId: string | null,
    name: string,
    type: "folder" | "file"
  ) => {
    const newNode: TraverseTree = {
      id: generateId(),
      name: name,
      type: type,
      ...(type === "folder" ? { children: [] } : {}),
    };
    const addRecursively = (nodes: TraverseTree[]): TraverseTree[] => {
      return nodes.map((node) => {
        if (node.id === parentId && node.type === "folder") {
          return {
            ...node,
            childern: [...(node.childern || []), newNode],
          };
        }
        if (node.childern) {
          return {
            ...node,
            childern: addRecursively(node.childern),
          };
        }
        return node;
      });
    };
    if (!parentId) {
      setStructure((prev) => [...prev, newNode]);
    } else {
      setStructure((prev) => addRecursively(prev));
    }
  };
  const deleteNode = (id: string) => {
    const removeRecursively = (nodes: TraverseTree[]): TraverseTree[] => {
      return nodes
        .filter((node) => node.id !== id)
        .map((eachNode) => ({
          ...eachNode,
          childern: eachNode.childern
            ? removeRecursively(eachNode.childern)
            : undefined,
        }));
    };
    setStructure((pre) => removeRecursively(pre));
  };
  const editNode = (id: string, newName: string) => {
    const editRecursively = (nodes: TraverseTree[]): TraverseTree[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            name: newName,
          };
        }
        return {
          ...node,
          childern: node.childern ? editRecursively(node.childern) : undefined,
        };
      });
    };
    setStructure((pre) => editRecursively(pre));
  };
  return { structure, addNode, deleteNode, editNode };
};
