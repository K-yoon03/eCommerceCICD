package kr.co.shop.service;

import kr.co.shop.common.exception.BusinessException;
import kr.co.shop.domain.Category;
import kr.co.shop.dto.CategoryResponse;
import kr.co.shop.dto.CategorySaveRequest;
import kr.co.shop.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategoryList() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryResponse::new)
                .toList();
    }

    @Transactional
    public void createCategory(CategorySaveRequest categorySaveRequest, String registerId) {
        if(categoryRepository.existsById(categorySaveRequest.getNbCategory())){
            throw new BusinessException("이미 존재하는 카테고리 입니다.", HttpStatus.CONFLICT);
        }

        Category category = Category.builder()
                .nbCategory(categorySaveRequest.getNbCategory())
                .nbParentCategory(categorySaveRequest.getNbParentCategory())
                .nmCategory(categorySaveRequest.getNmCategory())
                .nmFullCategory(categorySaveRequest.getNmFullCategory())
                .nmExplain(categorySaveRequest.getNmExplain())
                .cnLevel(categorySaveRequest.getCnLevel())
                .cnOrder(categorySaveRequest.getCnOrder())
                .ynUse(categorySaveRequest.getYnUse())
                .ynDelete(categorySaveRequest.getYnDelete())
                .noRegister(registerId)
                .daFirstDate(LocalDateTime.now())
                .build();

        categoryRepository.save(category);
    }
    @Transactional
    public void updateCategory(Integer nbCategory, CategorySaveRequest categorySaveRequest) {
        Category category = categoryRepository.findById(nbCategory)
                .orElseThrow( ()->
                        new BusinessException("알 수 없는 카테고리 입니다.", HttpStatus.NOT_FOUND));

        category.update(
                categorySaveRequest.getNbParentCategory(),
                categorySaveRequest.getNmCategory(),
                categorySaveRequest.getNmFullCategory(),
                categorySaveRequest.getNmExplain(),
                categorySaveRequest.getCnLevel(),
                categorySaveRequest.getCnOrder(),
                categorySaveRequest.getYnUse(),
                categorySaveRequest.getYnDelete()
        );
    }

    @Transactional
    public void deleteCategory(Integer nbCategory){
        if(!categoryRepository.existsById(nbCategory)){
            throw new BusinessException("알 수 없는 카테고리 입니다.", HttpStatus.NOT_FOUND);
        }
        categoryRepository.deleteById(nbCategory);
    }

}
