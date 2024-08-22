"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon } from "lucide-react";
import React from "react";
import { NewProduct, ProductType, useAddProductMutation } from "@/state/api";

const AddProductButton = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<NewProduct>({
    name: "",
    price: 0,
    stock: 0,
    productType: "VINYL",
    barcode: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [addProduct] = useAddProductMutation();

  const handleAddProduct = async (productBody: NewProduct) => {
    let parsedBody = {...productBody, price: Number(productBody.price), stock: Number(productBody.stock)}
    if (productBody.barcode === "") {
      parsedBody = { ...parsedBody, barcode: "0000000000000" };
    }

    await addProduct(parsedBody);
    setOpen(false);
    setFormData({
      name: "",
      price: 0,
      stock: 0,
      productType: "VINYL",
      barcode: "",
    });
    setPreviewUrl(null);
  };

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

  const handleCategoryChange = (value: ProductType) => {
    setFormData((prev) => ({ ...prev, productType: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-400 text-white hover:bg-blue-300 hover:text-white">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl">Add New Product</DialogTitle>
        </DialogHeader>
        <form className="space-y-6 mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image" className="text-lg font-medium">
                Product Image
              </Label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg aspect-square w-full max-w-[200px] mx-auto cursor-pointer hover:border-gray-400 transition-colors overflow-hidden bg-gray-50"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <img
                      src={previewUrl}
                      alt="Product preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <ImageIcon className="h-16 w-16 text-gray-400 mb-2" />
                    <p className="text-sm text-center px-4">
                      Drag and drop an image here, or click to select
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="name" className="text-right font-medium">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-6"
                required
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="price" className="text-right font-medium">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="col-span-6"
                required
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="stock" className="text-right font-medium">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="col-span-6"
                required
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="productType" className="text-right font-medium">
                Category
              </Label>
              <Select onValueChange={handleCategoryChange} required>
                <SelectTrigger className="col-span-6">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VINYL">Vinyl</SelectItem>
                  <SelectItem value="CD">Cd</SelectItem>
                  <SelectItem value="CASSETTE">Cassette</SelectItem>
                  <SelectItem value="EQUIPMENT">Equipment</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="barcode" className="text-right font-medium">
                Barcode
              </Label>
              <Input
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleInputChange}
                className="col-span-6"
                placeholder="Optional"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-blue-400 hover:bg-blue-300 text-white"
              onClick={() => {
                handleAddProduct(formData);
              }}
            >
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
