package kr.co.shop.controller;

import kr.co.shop.domain.Content;
import kr.co.shop.dto.FileUploadResponse;
import kr.co.shop.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    // 파일 업로드 (관리자)
    @PostMapping("/admin/files")
    public ResponseEntity<FileUploadResponse> upload(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal String idUser) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(fileService.upload(file, idUser));
    }

    // 파일 조회 (전체 허용 - 이미지 렌더링용)
    @GetMapping("/files/{nbFile}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long nbFile) {
        Content content = fileService.getFile(nbFile);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(
                MediaType.parseMediaType(
                        content.getNmContentType() != null
                                ? content.getNmContentType()
                                : "application/octet-stream"
                )
        );
        headers.setContentLength(content.getQtFileSize());

        return ResponseEntity.ok()
                .headers(headers)
                .body(content.getNmFileData());
    }
}