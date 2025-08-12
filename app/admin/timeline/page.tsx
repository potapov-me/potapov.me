"use client";

import { useState } from "react";
import { useTimeline } from "@/app/contexts/TimelineContext";
import { TimelineForm } from "@/app/components/TimelineForm";
import { TimelineItem } from "@/app/types";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/hooks/use-toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function AdminTimelinePage() {
  const { timelineItems, isLoading, addTimelineItem, updateTimelineItem, deleteTimelineItem } = useTimeline();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);

  const handleAdd = async (data: Omit<TimelineItem, "id">) => {
    try {
      await addTimelineItem(data);
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add timeline item:", error);
    }
  };

  const handleUpdate = async (data: Omit<TimelineItem, "id">) => {
    if (!editingItem) return;
    
    try {
      await updateTimelineItem(editingItem.id, data);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to update timeline item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteTimelineItem(id);
        toast({
          title: "Success",
          description: "Timeline item deleted successfully",
        });
      } catch (error) {
        console.error("Failed to delete timeline item:", error);
      }
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Timeline Management</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "Add New Item"}
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Timeline Item</h2>
          <TimelineForm 
            onSubmit={handleAdd} 
            onCancel={() => setShowAddForm(false)}
            submitLabel="Add Item"
          />
        </div>
      )}

      {editingItem && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Timeline Item</h2>
          <TimelineForm 
            initialData={editingItem}
            onSubmit={handleUpdate} 
            onCancel={() => setEditingItem(null)}
            submitLabel="Update Item"
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : timelineItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    No timeline items found.
                  </td>
                </tr>
              ) : (
                timelineItems
                  .sort((a, b) => b.year - a.year) // Sort by year descending
                  .map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                        {item.description.length > 100
                          ? `${item.description.substring(0, 100)}...`
                          : item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.isStartup && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                            Startup
                          </span>
                        )}
                        {item.isBlink && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Highlighted
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => setEditingItem(item)}
                        >
                          <FiEdit className="mr-1" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FiTrash2 className="mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}