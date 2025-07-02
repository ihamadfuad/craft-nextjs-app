import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "./ui/card"
import Image from "next/image"

export default function DefineNewAudience() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="m-8 p-8">
                    <Image src="/plus.circle.dashed.svg" alt="Add new audience" width={64} height={64} />
                    <h3 className="scroll-m-20 text-3xl font-regular tracking-tight text-slate-400">
                        Define
                    </h3>
                    <h4 className="scroll-m-20 text-3xl font-regular tracking-tight text-slate-400">
                        New Audience
                    </h4>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
