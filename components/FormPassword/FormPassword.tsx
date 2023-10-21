"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { ClipboardCheck, Clipboard } from "lucide-react";

const FormSchema = z.object({
  lengthPassword: z.string({
    required_error: "Veuillez choisir un nombre",
  }),
  specialChar: z.boolean().default(false),
  numberChar: z.boolean().default(false),
  uppercaseChar: z.boolean().default(false),
});

function generatePassword(
  length: number,
  special: boolean,
  numbers: boolean,
  uppercase: boolean
) {
  let charset = "abcdefghijklmnopqrstuvwxyz";
  if (special) charset += "!@#$%^&*()";
  if (numbers) charset += "0123456789";
  if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let password = "";
  // vérifie si le mot de passe contient 1 majuscule
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  if (uppercase && password.toLowerCase() === password) {
    console.log("password", password);
    return generatePassword(length, special, numbers, uppercase);
  }

  return password;
}

export function FormPassword() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const password = generatePassword(
      Number(data.lengthPassword),
      data.specialChar,
      data.numberChar,
      data.uppercaseChar
    );

    setPassword(password);
    setShowPassword(true);
    setCopied(false);
  }

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mot de passe</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="lengthPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taille du mot de passe</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisissez un nombre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="13">13</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="16">16</SelectItem>
                          <SelectItem value="17">17</SelectItem>
                          <SelectItem value="18">18</SelectItem>
                          <SelectItem value="19">19</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="21">21</SelectItem>
                          <SelectItem value="22">22</SelectItem>
                          <SelectItem value="23">23</SelectItem>
                          <SelectItem value="24">24</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialChar"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Caractères spéciaux
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberChar"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Chiffres</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="uppercaseChar"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Majuscules</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {showPassword && (
          <div>
            <Label htmlFor="password">Votre Mot de Passe:</Label>
            <div className="flex items-center mt-4">
              <Input
                type="email"
                id="email"
                placeholder={password}
                className="mr-4 inline-block"
              />
              {copied ? (
                <>
                  <ClipboardCheck strokeWidth={1} />
                  <span className="ml-2 ">Copié</span>
                </>
              ) : (
                <Clipboard
                  strokeWidth={1}
                  onClick={handleCopyPassword}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
