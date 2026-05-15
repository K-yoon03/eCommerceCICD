package kr.co.shop.service;

import kr.co.shop.common.exception.BusinessException;
import kr.co.shop.domain.CategoryProductMapping;
import kr.co.shop.domain.Product;
import kr.co.shop.dto.ProductDetailResponse;
import kr.co.shop.dto.ProductListResponse;
import kr.co.shop.dto.ProductSaveRequest;
import kr.co.shop.repository.CategoryProductMappingRepository;
import kr.co.shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryProductMappingRepository mappingRepository;

    // 목록 조회
//    @Transactional(readOnly = true)
//    public List<ProductListResponse> getProducts() {
//        return productRepository.findAll()
//                .stream()
//                .map(ProductListResponse::new)
//                .toList();
//    }
//
//    @Transactional(readOnly = true)
//    public List<ProductListResponse> getProductByCategoryId(Integer categoryId,
//                                                            Pageable pageable) {
//        return productRepository.findByCategoryId(categoryId, pageable)
//                .stream()
//                .map(ProductListResponse::new)
//                .toList();
//    }

    @Transactional(readOnly = true)
    public Page<ProductListResponse> getProducts(Integer categoryId, Pageable pageable) {
        if (categoryId != null) {
            return productRepository.findByCategoryId(categoryId, pageable)
                    .map(ProductListResponse::new);
        }
        return productRepository.findAll(pageable)
                .map(ProductListResponse::new);
    }

    // 상세 조회
    @Transactional(readOnly = true)
    public ProductDetailResponse getProduct(String noProduct) {
        Product product = productRepository.findById(noProduct)
                .orElseThrow(() ->
                        new BusinessException("상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        List<Integer> categoryIds = mappingRepository.findByNoProduct(noProduct)
                .stream()
                .map(CategoryProductMapping::getNbCategory)
                .toList();

        return new ProductDetailResponse(product, categoryIds);
    }



    // 등록 (관리자)
    @Transactional
    public void createProduct(ProductSaveRequest request, String registerId) {
        if (productRepository.existsById(request.getNoProduct())) {
            throw new BusinessException("이미 존재하는 상품 코드입니다.", HttpStatus.CONFLICT);
        }

        Product product = Product.builder()
                .noProduct(request.getNoProduct())
                .nmProduct(request.getNmProduct())
                .nmDetailExplain(request.getNmDetailExplain())
                .dtStartDate(request.getDtStartDate())
                .dtEndDate(request.getDtEndDate())
                .qtCustomer(request.getQtCustomer())
                .qtSalePrice(request.getQtSalePrice())
                .qtStock(request.getQtStock())
                .qtDeliveryFee(request.getQtDeliveryFee())
                .nbThumbnail(request.getNbThumbnail())
                .noRegister(registerId)
                .daFirstDate(LocalDateTime.now())
                .build();

        productRepository.save(product);
        saveMappings(request.getNoProduct(), request.getCategoryIds(), registerId);
    }

    // 수정 (관리자)
    @Transactional
    public void updateProduct(String noProduct, ProductSaveRequest request, String registerId) {
        Product product = productRepository.findById(noProduct)
                .orElseThrow(() ->
                        new BusinessException("상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

            product.update(
                request.getNmProduct(),
                request.getNmDetailExplain(),
                request.getDtStartDate(),
                request.getDtEndDate(),
                request.getQtCustomer(),
                request.getQtSalePrice(),
                request.getQtStock(),
                request.getQtDeliveryFee(),
                request.getNbThumbnail()
        );

        // 카테고리 매핑 재설정 (기존 삭제 후 재등록)
        mappingRepository.deleteByNoProduct(noProduct);
        saveMappings(noProduct, request.getCategoryIds(), registerId);
    }

    // 삭제 (관리자)
    @Transactional
    public void deleteProduct(String noProduct) {
        if (!productRepository.existsById(noProduct)) {
            throw new BusinessException("상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }
        mappingRepository.deleteByNoProduct(noProduct);
        productRepository.deleteById(noProduct);
    }

    // 카테고리 매핑 저장
    private void saveMappings(String noProduct, List<Integer> categoryIds, String registerId) {
        if (categoryIds == null || categoryIds.isEmpty()) return;

        for (int i = 0; i < categoryIds.size(); i++) {
            CategoryProductMapping mapping = CategoryProductMapping.builder()
                    .nbCategory(categoryIds.get(i))
                    .noProduct(noProduct)
                    .cnOrder(i + 1)
                    .noRegister(registerId)
                    .daFirstDate(LocalDateTime.now())
                    .build();
            mappingRepository.save(mapping);
        }
    }
}