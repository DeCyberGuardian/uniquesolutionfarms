"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = { kind: "general" | "distribution" }

export default function ContactForm({ kind }: Props) {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const fd = new FormData(e.currentTarget)
    const body = Object.fromEntries(fd.entries())
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context: kind, ...body }),
    })
    setStatus(res.ok ? "ok" : "err")
    if (res.ok) (e.currentTarget as HTMLFormElement).reset()
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {kind === "general" ? (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" name="firstName" required /></div>
            <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" name="lastName" required /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" placeholder="+233..." /></div>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select name="subject">
              <SelectTrigger><SelectValue placeholder="Select inquiry type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Product Information</SelectItem>
                <SelectItem value="quality">Quality Concern</SelectItem>
                <SelectItem value="stockist">Find a Stockist</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" rows={5} required /></div>
        </>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label htmlFor="businessName">Business Name</Label><Input id="businessName" name="businessName" required /></div>
            <div><Label htmlFor="contactPerson">Contact Person</Label><Input id="contactPerson" name="contactPerson" required /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label htmlFor="businessEmail">Business Email</Label><Input id="businessEmail" name="businessEmail" type="email" required /></div>
            <div><Label htmlFor="businessPhone">Business Phone</Label><Input id="businessPhone" name="businessPhone" placeholder="+233..." required /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location/Region</Label>
              <Select name="location">
                <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="greater-accra">Greater Accra</SelectItem>
                  <SelectItem value="ashanti">Ashanti</SelectItem>
                  <SelectItem value="western">Western</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="eastern">Eastern</SelectItem>
                  <SelectItem value="volta">Volta</SelectItem>
                  <SelectItem value="northern">Northern</SelectItem>
                  <SelectItem value="upper-east">Upper East</SelectItem>
                  <SelectItem value="upper-west">Upper West</SelectItem>
                  <SelectItem value="brong-ahafo">Brong Ahafo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select name="businessType">
                <SelectTrigger><SelectValue placeholder="Select business type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="wholesaler">Wholesaler</SelectItem>
                  <SelectItem value="retailer">Retailer</SelectItem>
                  <SelectItem value="supermarket">Supermarket Chain</SelectItem>
                  <SelectItem value="distributor">Regional Distributor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div><Label htmlFor="businessDetails">Business Details</Label><Textarea id="businessDetails" name="businessDetails" rows={4} required /></div>
        </>
      )}

      <Button type="submit" disabled={status==="sending"} className="w-full">
        {status==="sending" ? "Sending..." : (kind === "general" ? "Send Message" : "Submit Distribution Inquiry")}
      </Button>

      {status==="ok" && <p className="text-sm text-green-600">Thanks! We’ll get back to you shortly.</p>}
      {status==="err" && <p className="text-sm text-red-600">Sorry, something went wrong.</p>}
    </form>
  )
}
