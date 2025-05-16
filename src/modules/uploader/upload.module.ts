import {Module} from "@nestjs/common";
import {UploadController} from "./upload.controller";
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [UploadController],
    providers: [CloudinaryService],
    exports: []
})
export class UploadModule{}