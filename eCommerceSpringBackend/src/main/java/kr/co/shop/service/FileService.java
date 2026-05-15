package kr.co.shop.service;

import kr.co.shop.common.exception.BusinessException;
import kr.co.shop.domain.Content;
import kr.co.shop.dto.FileUploadResponse;
import kr.co.shop.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final ContentRepository contentRepository;

    // 허용 확장자
    private static final java.util.Set<String> ALLOWED_EXT =
            java.util.Set.of("jpg", "jpeg", "png", "gif", "webp");

    // 최대 파일 크기 10MB
    private static final long MAX_SIZE = 10 * 1024 * 1024L;

    @Transactional
    public FileUploadResponse upload(MultipartFile file, String registerId) {
        if (file.isEmpty()) {
            throw new BusinessException("파일이 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (file.getSize() > MAX_SIZE) {
            throw new BusinessException("파일 크기는 10MB 이하여야 합니다.", HttpStatus.BAD_REQUEST);
        }

        String orgName  = file.getOriginalFilename();
        String ext      = extractExt(orgName);

        if (!ALLOWED_EXT.contains(ext.toLowerCase())) {
            throw new BusinessException(
                    "허용되지 않는 파일 형식입니다. (jpg, jpeg, png, gif, webp)",
                    HttpStatus.BAD_REQUEST);
        }

        String saveName = UUID.randomUUID().toString().replace("-", "") + "." + ext;

        byte[] data;
        try {
            data = file.getBytes();
        } catch (IOException e) {
            throw new BusinessException("파일 읽기 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Content content = Content.builder()
                .nmOrgFile(orgName)
                .nmSaveFile(saveName)
                .nmFilePath("/uploads/")
                .nmContentType(file.getContentType())
                .qtFileSize(file.getSize())
                .nmFileExt(ext)
                .nmFileData(data)
                .daCreateAt(LocalDateTime.now())
                .nbOrgFile(0L)      // 원본 파일 참조 없으면 0
                .noRegister(registerId)
                .daFirstDate(LocalDateTime.now())
                .build();

        Content saved = contentRepository.save(content);
        return new FileUploadResponse(saved);
    }

    @Transactional(readOnly = true)
    public Content getFile(Long nbFile) {
        return contentRepository.findById(nbFile)
                .orElseThrow(() ->
                        new BusinessException("파일을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
    }

    private String extractExt(String filename) {
        if (filename == null || !filename.contains(".")) {
            throw new BusinessException("파일 확장자가 없습니다.", HttpStatus.BAD_REQUEST);
        }
        return filename.substring(filename.lastIndexOf('.') + 1);
    }
}