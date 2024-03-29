import { takeEvery, debounce, put } from "redux-saga/effects";
import axios from "axios";

import {
  getProductListRequest,
  getProductListSuccess,
  getProductListFail,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
} from "../slicers/product.slice";

function* getProductListSaga(action) {
  try {
    const { categoryId, typeId, page, keyword, priceOrder, limit, more } =
      action.payload;
    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        categoryId: categoryId,
        typeId: typeId,
        ...(priceOrder && {
          _sort: "price",
          _order: priceOrder,
        }),
        ...(keyword && {
          q: keyword,
        }),
        _page: page,
        _limit: limit,
      },
    });
    yield put(
      getProductListSuccess({
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: page,
          limit: limit,
        },
        more: more,
      })
    );
  } catch (e) {
    yield put(getProductListFail({ error: "Lỗi..." }));
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
        _embed: "favorites",
      },
    });
    yield put(getProductDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProductDetailFail({ error: "Lỗi..." }));
  }
}

export default function* productSaga() {
  yield debounce(500, getProductListRequest, getProductListSaga);
  yield takeEvery(getProductDetailRequest, getProductDetailSaga);
}
