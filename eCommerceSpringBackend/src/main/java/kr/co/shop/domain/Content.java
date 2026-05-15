package kr.co.shop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_CONTENT")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NB_FILE")
    private Long nbFile;

    @Column(name = "NM_ORG_FILE", length = 200)
    private String nmOrgFile;

    @Column(name = "NM_SAVE_FILE", length = 200)
    private String nmSaveFile;

    @Column(name = "NM_FILE_PATH", length = 200)
    private String nmFilePath;

    @Column(name = "NM_CONTENT_TYPE", length = 20)
    private String nmContentType;

    @Column(name = "QT_FILE_SIZE")
    private Long qtFileSize;

    @Column(name = "NM_FILE_EXT", length = 10, nullable = false)
    private String nmFileExt;

    @Lob
    @Column(name = "NM_FILE_DATA")
    private byte[] nmFileData;

    @Column(name = "DA_CREATE_AT", nullable = false)
    private LocalDateTime daCreateAt;

    @Column(name = "NB_ORG_FILE", nullable = false)
    private Long nbOrgFile;

    @Column(name = "NO_REGISTER", length = 30)
    private String noRegister;

    @Column(name = "DA_FIRST_DATE")
    private LocalDateTime daFirstDate;
}