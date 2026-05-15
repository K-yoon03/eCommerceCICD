package kr.co.shop.dto;

import kr.co.shop.domain.Content;
import lombok.Getter;

@Getter
public class FileUploadResponse {

    private final Long nbFile;
    private final String nmOrgFile;
    private final String nmContentType;
    private final Long qtFileSize;

    public FileUploadResponse(Content content) {
        this.nbFile        = content.getNbFile();
        this.nmOrgFile     = content.getNmOrgFile();
        this.nmContentType = content.getNmContentType();
        this.qtFileSize    = content.getQtFileSize();
    }
}