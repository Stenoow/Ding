import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import { Enterprises as EnterprisesModel } from '@prisma/client';
import {EnterprisesService} from "./enterprises.service";

@Controller()
export class EnterprisesController {
    constructor(
        private readonly enterpriseService: EnterprisesService,
    ) {}

    @Get('enterprise/:id')
    async getPostById(@Param('id') id: string): Promise<EnterprisesModel> {
        return this.enterpriseService.enterprise({ id: Number(id) });
    }
    // @Post('post')
    // async createDraft(
    //     @Body() postData: { title: string; content?: string; authorEmail: string },
    // ): Promise<PostModel> {
    //     const { title, content, authorEmail } = postData;
    //     return this.postService.createPost({
    //         title,
    //         content,
    //         author: {
    //             connect: { email: authorEmail },
    //         },
    //     });
    // }
    //
    // @Post('user')
    // async signupUser(
    //     @Body() userData: { name?: string; email: string },
    // ): Promise<UserModel> {
    //     return this.userService.createUser(userData);
    // }
    //
    // @Put('publish/:id')
    // async publishPost(@Param('id') id: string): Promise<PostModel> {
    //     return this.postService.updatePost({
    //         where: { id: Number(id) },
    //         data: { published: true },
    //     });
    // }
    //
    // @Delete('post/:id')
    // async deletePost(@Param('id') id: string): Promise<PostModel> {
    //     return this.postService.deletePost({ id: Number(id) });
    // }
}
