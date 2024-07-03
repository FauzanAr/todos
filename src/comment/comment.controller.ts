import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/user/user.request.type';
import {
  CommentCreateDtoSwagger,
  CommentCreateSchema,
  CommentCreateType,
} from './dto/create-comment.dto';
import { ZodPipe } from 'src/zod/zod-pipe';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiBody({ type: CommentCreateDtoSwagger })
  @Post()
  createComment(
    @Req() req: RequestWithUser,
    @Body(new ZodPipe(CommentCreateSchema)) body: CommentCreateType,
  ) {
    const userId = req.user['userId'];
    return this.commentService.createComment(userId, body);
  }
}
